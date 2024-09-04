export interface snackbarMessage {
  message: string;
  actionText: string;
}

export const SNACKBAR_MESSAGES: Record<string, snackbarMessage> = {
  register_success: {
    message: 'Cadastro realizado com sucesso!',
    actionText: 'Fechar',
  },
  register_error: {
    message: 'Erro ao realizar o cadastro.',
    actionText: 'Fechar',
  },
  activity_edit_success: {
    message: 'Atividade editada com sucesso!',
    actionText: 'Fechar',
  },
};
