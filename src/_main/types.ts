export interface ResumePackage {
    Id: string;
    Name: string;
    Version: string;
}

export enum PackageType { Msi = "Msi", Exe = "Exe", Msix = "Msix" }
export enum InstallerType { Msi = "Msi", Exe = "Exe", Msix = "Msix" }

export interface PackageInstaller {
    Arch: string;
    URL: string;
    DownloadUrl: string;
    Sha: string;
    SignatureSha256: string;
    Switches: string[];
    Scope: string;
    SystemAppId: string;
    Type: PackageType;
}

export interface Package {
    Id: string;
    Author: string;
    Publisher: string;
    Name: string;
    AppMoniker: string;
    Version: string;
    Channel: string;
    License: string;
    LicenseUrl: string;
    MinOSVersion: string;
    Description: string;
    Homepage: string;
    Tags: string;
    FileExtensions: string;
    Protocols: string;
    Commands: string;
    InstallerType: InstallerType;
    Custom: string;
    Silent: string;
    SilentWithProgress: string;
    Interactive: string;
    Language: string;
    Log: string;
    InstallLocation: string;
    Installer: PackageInstaller;
    Installers: PackageInstaller;
    Localization: { Language: string };
    ManifestVersion: string;
}