import * as yup from 'yup';

const markupPercentageRegex = /^((([0-4]\.([0-9]([0-9])?)?))||([5]\.([0]([0])?)?)||([0-5]))$/;
const urlRegex = /^[a-z][a-z0-9.+-]*:\/\/[0-9a-zA-Z.-]+[%/\w .-]*$/;

export const appRegisterSchema = yup.object({
  name: yup
    .string()
    .required('Enter your app name.')
    .max(48, 'Your app name cannot exceed 48 characters.'),
  read: yup.boolean(),
  trade: yup.boolean(),
  payments: yup.boolean(),
  trading_information: yup.boolean(),
  admin: yup.boolean(),
  api_token: yup
    .string()
    .required('Select Your API token (with the Admin scope) to register your app.')
    .max(255, 'Your API token cannot exceed 255 characters.'),
  redirect_uri: yup
    .string()
    .required('This is required')
    .max(255, 'Your website URL cannot exceed 255 characters.')
    .matches(urlRegex, 'Enter a valid URL. (Example: https://www.[yourname].com)'),
  verification_uri: yup
    .string()
    .required('This is required')
    .max(255, 'Your website URL cannot exceed 255 characters.')
    .matches(urlRegex, 'Enter a valid URL. (Example: https://www.[yourname].com)'),
  app_markup_percentage: yup
    .string()
    .max(4, 'Your markup value cannot be more than 4 characters.')
    .matches(
      markupPercentageRegex,
      'Your markup value must be equal to or above 0.00 and no more than 5.00.',
    ),
  app_id: yup.number(),
});

export type IRegisterAppForm = yup.InferType<typeof appRegisterSchema>;