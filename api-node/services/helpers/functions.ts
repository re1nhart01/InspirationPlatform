import crypto from "crypto";
import { pipe, split as splitR } from "ramda";


export function print (path: any, layer: any) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
      console.log('%s /%s',
        layer.method.toUpperCase(),
        path.concat(split(layer.regexp)).filter(Boolean).join('/'))
    }
  }

  export function split (thing: any) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }


export function isValidEmail(email: string) {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export const castParamWithExtendedValue = (params: { [key: string]: string }, key: string) => {
    return params[key] || ""
}


export const hashString = (salt: string) => {
    return crypto.createHash('md5').update(salt).digest('hex');
}

///messaging/konoha/c3b92507e56380dc3c55549e7229a873?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRva3lvX2dob3VsIiwiZW1haWwiOiJ0b2t5b19naG91bEB6eGMuenhjIiwiaWF0IjoxNzE4NDIyMTA4fQ.Xa6-EzVqDmSrgv-jgdjYLiLNC3zraJZd0qYRR8ZrotM
export const parseUrlFromSocket = (url: string) => {
    const result = {
        chatHash: "",
        token: "",
    }
    const splitF = splitR("/")(url);
    const third = splitF[3]
    if (third) {
        const chatMisc = splitR("?token=")(third)
        result.chatHash = chatMisc?.[0];
        result.token = chatMisc?.[1];
    }
    return result;
}
