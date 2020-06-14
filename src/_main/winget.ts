import { exec } from "child_process";
import { ResumePackage, Package, PackageType, PackageInstaller, Source } from './types';
import YAML from "yaml";
import { executer, anonymousExec } from "./shell";

export const getVersion = () => new Promise((resolve, reject) => {
    exec("winget -v", (error, stdOut) => {
        if (error) {
            reject(error);
            return;
        }

        resolve(stdOut as string);
    });
});

const buildPackageResume = (cliLine: string[]) => {
    const version = cliLine.splice(cliLine.length - 1, 1);
    const id = cliLine.splice(cliLine.length - 1, 1);
    const name = cliLine.join(' ');
    return {
        Id: id[0],
        Name: name,
        Version: version[0]
    } as ResumePackage;
}

export const listerPackages = () => executer("winget", ["search"], false).then(data => {
    const rawPackages = data.toString().substring(data.toString().lastIndexOf('---')).replace('---', '').trim().split('\r\n');
    const listePackages = rawPackages.map(_ => _.split(' ').filter(_ => !!_));
    return listePackages.map(buildPackageResume);
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

export const showPackage = (id: string, version?: string) => executer("winget", ["show", "--id", id, "--exact", ...(version ? ["--version", version] : [])]).then(data => {
    const res = data.toString().trim();
    const rawIdentifier = res.substring(0, res.indexOf('\r\n')).trim();
    const rawDescription = res.substring(res.indexOf('\r\n')).trim();
    const pkg = buildPackage(
        formatPackageIdentifier(rawIdentifier),
        formatPackageDescription(rawDescription)
    );
    return pkg;
});

export const listVersions = (id: string) => executer("winget", ["show", "--id", id, "--exact", "--versions"]).then(data => {
    return data.substring(data.lastIndexOf('---')).replace('---', '').trim().split('\r\n');
});

export const installPackage = (id: string) => anonymousExec("winget", ["install", "--id", id, "--exact"]);

const buildSource = (rawSource: string[]) => {
    const url = rawSource.splice(rawSource.length - 1, 1)[0];
    const name = rawSource.join(' ');
    return {
        name,
        url
    } as Source;
}

export const listSources = () => executer("winget", ["source", "list"]).then(data => {
    const rawSources = data.substring(data.lastIndexOf('---')).replace('---', '').trim().split('\r\n');
    return rawSources.map(src => buildSource(src.split(' ')));
});

export const addSource = (name: string, url: string) => executer("winget", ["source", "add", "-n", name, "-a", url]).then(() => true);

export const refreshSource = (name?: string) => {
    const args = ["source", "update", ...(name ? ['-n', name] : [])];
    return executer("winget", args).then(() => true);
};

export const removeSource = (name: string) => executer("winget", ["source", "remove", "-n", name]).then(() => true);