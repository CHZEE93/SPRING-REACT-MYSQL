import { CommentItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetCommentListResponseDto extends ResponseDto{
    commentList: CommentItem[]
}