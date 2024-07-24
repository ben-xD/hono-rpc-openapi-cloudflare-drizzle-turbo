import eslintConfigRepo from 'eslint-config-repo';
import tseslint from "typescript-eslint";

export default tseslint.config(
    ...eslintConfigRepo,
{
    languageOptions: {
        parserOptions: {
            ...eslintConfigRepo.parserOptions,
            tsconfigRootDir: import.meta.dirname
        }
    }
}
)
