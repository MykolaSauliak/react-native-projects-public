import { User } from "./User.type";

export interface Comment {
    "kind": string | "product#comment",
    "etag"?: string,
    "id": string,
    "snippet": {
      "authorDisplayName": string,
      "authorProfileImageUrl": string,
      "authorId": string,
      "productId": string,
      "textDisplay": string,
      "textOriginal": string,
      "parentId": string,
      "canRate": boolean,
      "viewerRating": string,
      // "likeCount"?: number,
      "moderationStatus": string,
      "publishedAt": string,
      "updatedAt": string
      "published_time": number,
      "updated_time": number
    },
    "user"?: User,
    "likes": [],
    "dislikes": [],
  }
