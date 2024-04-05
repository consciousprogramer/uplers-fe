export interface baseQueryParams extends Record<string, string> {
  format: "xml" | "json" | "jsonp"
  lang: "nl" | "fr" | "en" | "de"
}
