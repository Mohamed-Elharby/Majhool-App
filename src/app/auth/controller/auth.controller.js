import { name } from "nodemailer/lib/package-info.js";
import { validateDTO } from "../../../lib/validation/validation.js";
import {registerDTO,confermEmailDTO,loginDTO,resendOtpDTO,resetPasswordDTO} from "../authDTO/authDTO.js";
import * as authService from "../service/auth.service.js";
import { time } from "../../../pkg/utils/time.js";

export async function addUser(req, res, next) {
  try {
    const data = validateDTO(registerDTO, req.body);
    const user = await authService.register(data);
    res.json({
      message: "User Added Susscus",
      Success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function userConferm(req, res, next) {
  try {
    const data = validateDTO(confermEmailDTO, req.body);
    const { email, code } = data;
    const user = await authService.verifyAccount(email, code);
    res.json({
      message: "User Conferm Susscus",
      Success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function userLogin(req, res, next) {
  try {
    const data = validateDTO(loginDTO, req.body);
    const { email, password } = data;
    const token = await authService.login(email, password );
    res.cookie("token", token, {
      maxAge: time("1h"),
      httpOnly: true,
    });
    res.json({
      message: "User LogIn Susscessfuly",
      Success: true,
    });
  } catch (error) {
    next(error);
  }
}

export async function newOtp(req, res, next) {
  try {
    const data = validateDTO(resendOtpDTO, req.body);
    const { email } = data;
    await authService.resendOtp(email);
    res.json({
      message: "A new OTP has been sent to your email.",
      Success: true,
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const data = validateDTO(resetPasswordDTO, req.body);
    const { email, newPassword, code } = data;
    await authService.setNewPassword(email, newPassword, code);
    res.json({
      message: "Password updated successfully",
      Success: true,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginWithGoogel(req, res, next) {
  try {
    const token = await authService.loginWithGoogle(req.body.idToken);
    res.cookie("access-token", token, {
      maxAge: time("1h"),
      httpOnly: true,
    });
    res.json({
      message: "User LogIn Susscessfuly",
      Success: true,
    });
  } catch (error) {
    next(error);
  }
}