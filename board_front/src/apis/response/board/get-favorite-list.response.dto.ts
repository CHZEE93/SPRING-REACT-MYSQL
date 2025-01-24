import { FavoriteItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetFavoriteListResponseDto extends ResponseDto{
    favoriteList: FavoriteItem[]
}