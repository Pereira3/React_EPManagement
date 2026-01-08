/**  replace(/\s+/g, " ") -> Replaces multiple spaces with a single space
 * \s is the code to all whitespace characters (spaces, tabs, line breaks)
 * + means one or more occurrences of the preceding element
 * g stands for global, meaning it will replace all occurrences in the string
 * */
export function normalizedString(string: string): string {
  return string.trim().replace(/\s+/g, " ").toUpperCase();
}
