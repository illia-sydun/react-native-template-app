export const phoneNumberRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const phoneNumberMask = [
    '+',
    '1',
    ' ',
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

export const verificationCodeMask = [
    'C',
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

export const extractUnmaskedVerificationCode = (verificationCode: string) =>
    verificationCode.split('C-')[1];
