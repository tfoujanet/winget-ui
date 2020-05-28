import { exec, spawn } from "child_process";
import { ResumePackage, Package, PackageType, PackageInstaller } from './types';
import YAML from "yaml";

export const getVersion = () => new Promise((resolve, reject) => {
    exec("winget -v", (error, stdOut) => {
        if (error) {
            reject(error);
            return;
        }

        resolve(stdOut as string);
    });
});

export const listerPackages = () => new Promise((resolve, reject) => {
    const search = spawn("winget", ["search"]);

    const packages: any[] = [];

    search.stdout.on("data", (data: Buffer) => {
        const rawPackages = data.toString().substring(data.toString().lastIndexOf('---')).replace('---', '').trim().split('\r\n');
        const listePackages = rawPackages.map(_ => _.split(' ').filter(_ => !!_)).filter(_ => _ && _.length === 3)
        packages.push(...listePackages.map(([Name, Id, Version]) => ({
            Id: Id,
            Name: Name,
            Version: Version
        } as ResumePackage)));
    });
    search.stderr.on("data", data => reject(data));
    search.on("close", code => {
        resolve(packages);
    });
});

export const showPackage = (id: string) => new Promise((resolve, reject) => {
    const pkg = spawn("winget", ["show", "--id", id], { shell: true });

    let packageIdentifier: any;
    let packageDescription: any = {};

    pkg.stderr.on('data', d => reject(d));

    pkg.stdout.on("data", (data: Buffer) => {
        const res = data.toString().trim();
        if (!packageIdentifier) {
            const idMatch = res.match(/\[[a-zA-z0-9\.]+\]$/);
            const nameMatch = res.match(/\[[a-zA-z0-9\. ]+\[/);
            packageIdentifier = {
                Id: idMatch && idMatch.length === 1 && idMatch[0].replace("[96m", "").replace("]", ""),
                Name: nameMatch && nameMatch.length === 1 && nameMatch[0].replace(/\[/g, '').replace("96m", "").trim()
            };
        } else {
            const formattedYaml = res.split('\r\n')
                .map(_ => ({ original: _, matches: _.match(/^([\w\s]+):\s(.+)$/) }))
                .map(_ => _.matches ? `${_.matches[1]}: "${_.matches[2]}"` : _.original)
                .join('\r\n');
            packageDescription = YAML.parse(formattedYaml);
        }
    });

    pkg.on("close", code => {
        const installer: (installer: any) => PackageInstaller = installer => installer && ({
            Arch: installer.Arch,
            URL: installer.URL,
            DownloadUrl: installer['Download Url'] || installer.DownloadUrl,
            Sha: installer.SHA256,
            SignatureSha256: installer.SignatureSha256,
            Switches: installer.Switches,
            Scope: installer.Scope,
            SystemAppId: installer.SystemAppId,
            Type: installer.Type as PackageType
        } as PackageInstaller);
        const foundPackage: Package = {
            Id: packageIdentifier.Id,
            Author: packageDescription.Author,
            Publisher: packageDescription.Publisher,
            Name: packageIdentifier.Name,
            AppMoniker: packageDescription.AppMoniker,
            Version: packageDescription.Version,
            Channel: packageDescription.Channel,            
            License: packageDescription.License,
            LicenseUrl: packageDescription["License Url"] || packageDescription.LicenseUrl,
            MinOSVersion: packageDescription.MinOSVersion,
            Description: packageDescription.Description,
            Homepage: packageDescription.Homepage,
            Tags: packageDescription.Tags,
            FileExtensions: packageDescription.FileExtensions,
            Protocols: packageDescription.Protocols,
            Commands: packageDescription.Commands,
            InstallerType: packageDescription.InstallerType,
            Custom: packageDescription.Custom,
            Silent: packageDescription.Silent,
            SilentWithProgress: packageDescription.SilentWithProgress,
            Interactive: packageDescription.Interactive,
            Language: packageDescription.Language,
            Log: packageDescription.Log,
            InstallLocation: packageDescription.InstallLocation,            
            Installer: installer(packageDescription.Installer),
            Installers: installer(packageDescription.Installers),
            Localization: packageDescription.Localization,
            ManifestVersion: packageDescription.ManifestVersion
        };
        resolve(foundPackage);
    });
});

export const installPackage = (id: string) => new Promise((resolve, reject) => {
    const install = spawn("winget", ["install", "--id", id]);
    install.stderr.on("data", data => reject(data));
    install.on("close", code => {
        resolve();
    });
});