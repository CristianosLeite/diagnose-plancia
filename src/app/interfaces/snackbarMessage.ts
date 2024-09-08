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
  activity_edit_error: {
    message: 'Erro ao editar atividade.',
    actionText: 'Fechar',
  },
  activity_delete_success: {
    message: 'Atividade deletada com sucesso!',
    actionText: 'Fechar',
  },
  activity_delete_error: {
    message: 'Erro ao deletar atividade.',
    actionText: 'Fechar',
  },
  activity_create_success: {
    message: 'Atividade criada com sucesso!',
    actionText: 'Fechar',
  },
  activity_create_error: {
    message: 'Erro ao criar atividade.',
    actionText: 'Fechar',
  },
  login_success: {
    message: 'Login realizado com sucesso!',
    actionText: 'Fechar',
  },
  login_error: {
    message: 'Erro ao realizar login.',
    actionText: 'Fechar',
  },
  logout_success: {
    message: 'Logout realizado com sucesso!',
    actionText: 'Fechar',
  },
  logout_error: {
    message: 'Erro ao realizar logout.',
    actionText: 'Fechar',
  },
  user_edit_success: {
    message: 'Usuário editado com sucesso!',
    actionText: 'Fechar',
  },
  user_edit_error: {
    message: 'Erro ao editar usuário.',
    actionText: 'Fechar',
  },
  user_delete_success: {
    message: 'Usuário deletado com sucesso!',
    actionText: 'Fechar',
  },
  user_delete_error: {
    message: 'Erro ao deletar usuário.',
    actionText: 'Fechar',
  },
  user_create_success: {
    message: 'Usuário criado com sucesso!',
    actionText: 'Fechar',
  },
  user_create_error: {
    message: 'Erro ao criar usuário.',
    actionText: 'Fechar',
  },
  user_not_found: {
    message: 'Usuário não encontrado.',
    actionText: 'Fechar',
  },
  user_already_exists: {
    message: 'Usuário já existe.',
    actionText: 'Fechar',
  },
  user_not_authenticated: {
    message: 'Usuário não autenticado.',
    actionText: 'Fechar',
  },
  user_not_authorized: {
    message: 'Usuário não autorizado.',
    actionText: 'Fechar',
  },
  user_not_logged_in: {
    message: 'Usuário não logado.',
    actionText: 'Fechar',
  },
  user_not_admin: {
    message: 'Usuário não é administrador.',
    actionText: 'Fechar',
  },
  user_not_supervisor: {
    message: 'Usuário não é supervisor.',
    actionText: 'Fechar',
  },
  user_not_operator: {
    message: 'Usuário não é operador.',
    actionText: 'Fechar',
  },
};
