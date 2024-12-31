import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // Do not write semicolons
      'semi': ["error", "never"],
    }
  }
]

export default eslintConfig
