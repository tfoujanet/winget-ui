import { exec, spawn } from "child_process";
import { ResumePackage, Package, PackageType, PackageInstaller } from './types';
import YAML from "yaml";
import { executer, stream } from "./shell";

export const getVersion = () => new Promise((resolve, reject) => {
    exec("winget -v", (error, stdOut) => {
        if (error) {
            reject(error);
            return;
        }

        resolve(stdOut as string);
    });
});

export const listerPackages = () => executer("winget", ["search"]).then(data => {
    const rawPackages = data.toString().substring(data.toString().lastIndexOf('---')).replace('---', '').trim().split('\r\n');
    const listePackages = rawPackages.map(_ => _.split(' ').filter(_ => !!_)).filter(_ => _ && _.length === 3);
    return listePackages.map(([Name, Id, Version]) => ({
        Id: Id,
        Name: Name,
        Version: Version
    } as ResumePackage));
});

const formatPackageIdentifier = (rawIdentifier: string) => {
    const idMatch = rawIdentifier.match(/\[[a-zA-z0-9\-\.]+\]$/);
    const nameMatch = rawIdentifier.match(/\[[a-zA-z0-9\. ]+\[/);
    return {
        Id: idMatch && idMatch.length === 1 && idMatch[0].replace("[96m", "").replace("]", ""),
        Name: nameMatch && nameMatch.length === 1 && nameMatch[0].replace(/\[/g, '').replace("96m", "").trim()
    };
};

const formatPackageDescription = (rawDescription: string) => {
    const formattedYaml = rawDescription.split('\r\n')
        .map(_ => ({ original: _, matches: _.match(/^([\w\s]+):\s(.+)$/) }))
        .map(_ => _.matches ? `${_.matches[1]}: "${_.matches[2]}"` : _.original)
        .join('\r\n');
    return YAML.parse(formattedYaml);
};

const buildPackage = (packageId: any, packageDescription: any) => {
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
    return {
        Id: packageId.Id,
        Author: packageDescription.Author,
        Publisher: packageDescription.Publisher,
        Name: packageId.Name,
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
    } as Package;
}

export const showPackage = (id: string) => executer("winget", ["show", "--id", id, "--exact"]).then(data => {
    const res = data.toString().trim();
    const rawIdentifier = res.substring(0, res.indexOf('\r\n')).trim();
    const rawDescription = res.substring(res.indexOf('\r\n')).trim();
    const pkg = buildPackage(
        formatPackageIdentifier(rawIdentifier),
        formatPackageDescription(rawDescription)
    );
    return pkg;
});

export const installPackage = (id: string) => stream("winget", ["install", "--id", id, "--exact"]);