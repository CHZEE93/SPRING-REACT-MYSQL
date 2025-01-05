import ResponseDto from "../response.dto";

export default interface SignInResponseDTO extends ResponseDto{
    token: string;
    expirationTime: number;
}