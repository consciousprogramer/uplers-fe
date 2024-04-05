import { baseQueryParams } from "@/interfaces/api/request/belgiumPublicTransport"

export const BPT_BASE_URL = "https://api.irail.be"

export const BPT_BASE_QUERY_PARAMS: baseQueryParams = {
  format: "json",
  lang: "en",
}

export const BPT_BASE_QUERY_STRING = new URLSearchParams(BPT_BASE_QUERY_PARAMS)
