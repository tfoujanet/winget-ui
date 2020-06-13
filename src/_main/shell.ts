import { spawn } from "child_process";

export const executer = (commande: string, args: string[], powershell: boolean = true) => new Promise<string>((resolve, reject) => {
    const opts = powershell ? { shell: "powershell.exe" } : undefined;
    const process = spawn(commande, args, opts);
    let result = "";
    process.stdout.on("data", v => result += v);
    process.stderr.on("error", reject);
    process.on("close", () => resolve(result));
});

export const anonymousExec = (commande: string, args: string[]) => {
    const cmd = `${commande} ${args.join(' ')}`;
    return executer('Powershell', [ '-noprofile', '-ExecutionPolicy', 'Bypass', '-Command', `'${cmd}'` ]);
};
