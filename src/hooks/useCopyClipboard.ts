import { useSnackbar } from 'bluerally-design-system';
import { useCallback } from 'react';

type Props = {
  value: string;
  alertMessage?: string;
  errorMessage?: string;
};

export const useCopyClipboard = () => {
  const snackbar = useSnackbar();

  const copyToClipboard = useCallback(
    ({
      value,
      alertMessage = '복사되었습니다.',
      errorMessage = '복사에 실패했습니다.',
    }: Props) => {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          snackbar.success({ content: alertMessage });
        })
        .catch((err) => {
          console.error(`${errorMessage} ${err}`);
        });
    },
    [snackbar],
  );

  return copyToClipboard;
};
