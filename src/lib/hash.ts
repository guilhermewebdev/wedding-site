import { Options, hash, verify } from "argon2";
import { PasswordHash } from "../modules/admin/service";
import { argon2id } from "argon2";

export class PasswordHashImpl implements PasswordHash {
    private readonly settings = {
        saltLength: 16,
        parallelism: 8,
        type: argon2id,
    }

    public async encrypt(value: string): Promise<string> {
        return hash(value, this.settings)
    }

    public async check(value: string, hash: string): Promise<boolean> {
        return verify(hash, value, this.settings);
    }
}