import Shell from "node-powershell";
import { EventEmitter } from "events";
import { spawn } from "child_process";

const initializeShell = () => new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
});

export const executer = (commande: string, args: string[], powershell: boolean = true) => new Promise<string>((resolve, reject) => {
    const opts = powershell ? { shell: "powershell.exe" } : undefined;
    const process = spawn(commande, args, opts);
    let result = "";
    process.stdout.on("data", v => result += v);
    process.stderr.on("error", reject);
    process.on("close", () => resolve(result));
});

export const anonymousExec = (commande: string, args: string[]) => {
    const ps = new Shell({
        executionPolicy: 'Bypass',
        noProfile: true
    });
    const cmd = `${commande} ${args.join(' ')}`;
    ps.addCommand(cmd);
    return ps.invoke();
};
