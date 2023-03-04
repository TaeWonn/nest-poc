export interface KakaoGetUserResponse {
  id: number;
  connected_at: Date;
  kakao_account: KakaoAccount;
}

export interface KakaoAccount {
  has_email: boolean;
  email_needs_agreement: boolean;
  has_age_range: boolean;
  age_range_needs_agreement: boolean;
  has_gender: boolean;
  gender_needs_agreement: boolean;
}
