package com.jiraynor.board_back.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.jiraynor.board_back.common.ResponseCode;
import com.jiraynor.board_back.common.ResponseMessage;
import com.jiraynor.board_back.dto.object.BoardListItem;
import com.jiraynor.board_back.dto.response.ResponseDto;
import com.jiraynor.board_back.entity.BoardListViewEntity;

import lombok.Getter;

@Getter
public class GetLatestsBoardListResponseDto extends ResponseDto {

    private List<BoardListItem> latestList;

    private GetLatestsBoardListResponseDto(List<BoardListViewEntity> boardEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.latestList = BoardListItem.getList(boardEntities);
    }

    public static ResponseEntity<GetLatestsBoardListResponseDto> success(List<BoardListViewEntity> boardEntities) {
        GetLatestsBoardListResponseDto result = new GetLatestsBoardListResponseDto(boardEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
