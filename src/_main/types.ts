export interface ResumePackage {
    Id: string;
    Name: string;
    Version: string;
}

export enum PackageType { Msi = "Msi", Exe = "Exe", Msix = "Msix" }

export interface PackageInstaller {
    Sha: string;
    DownloadUrl: string;
    Type: PackageType;
}

export interface Package {
    Id: string;
    Name: string;
    Version: string;
    Publisher: string;
    Author: string;
    AppMoniker: string;
    Description: string;
    Homepage: string;
    License: string;
    LicenseUrl: string;
    Installer: PackageInstaller
}