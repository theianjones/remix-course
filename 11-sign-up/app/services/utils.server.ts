import { json } from "@remix-run/node"

export function badRequest<TActionData>(data: TActionData, status = 400){
    return json<TActionData>(data, {status})
}
