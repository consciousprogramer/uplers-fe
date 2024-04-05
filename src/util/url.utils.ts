import {
  BPT_BASE_URL,
  BPT_BASE_QUERY_STRING,
} from "@/constants/api/belgiumPublicTransport.constants"

export const constructBPTUrls = (path: string, queryString?: string) => {
  if (queryString)
    return `${BPT_BASE_URL}/${path}?${BPT_BASE_QUERY_STRING}&${queryString}`
  return `${BPT_BASE_URL}/${path}?${BPT_BASE_QUERY_STRING}`
}
