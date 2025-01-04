package com.jiraynor.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jiraynor.board_back.dto.request.auth.SignInRequestDto;
import com.jiraynor.board_back.dto.request.auth.SignUpRequestDto;
import com.jiraynor.board_back.dto.response.ResponseDto;
import com.jiraynor.board_back.dto.response.auth.SignInResponseDto;
import com.jiraynor.board_back.dto.response.auth.SignUpResponseDto;
import com.jiraynor.board_back.entity.UserEntity;
import com.jiraynor.board_back.provider.JwtProvider;
import com.jiraynor.board_back.repository.UserRepository;
import com.jiraynor.board_back.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    // final 명시 -> 의존성 주입
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

        try {
            String email = dto.getEmail();
            boolean existedEmail = userRepository.existsByEmail(email);
            if (existedEmail)
                return SignUpResponseDto.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if (existedNickname)
                return SignUpResponseDto.duplicateNickname();

            String telNumber = dto.getTelNumber();
            boolean existedTelNumber = userRepository.existsByTelNumber(telNumber);
            if (existedTelNumber)
                return SignUpResponseDto.duplicateTelNumber();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {

        String token = null;

        try {
            String email = dto.getEmail();
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null)
                return SignInResponseDto.signInFailed();

            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if (!isMatched)
                return SignInResponseDto.signInFailed();

            token = jwtProvider.create(email);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(token);
    }

}
