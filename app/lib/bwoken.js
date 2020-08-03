export const BWOKEN = (namespace, message, error={}) => ({
  result: "app::error",
  payload: {
    message: `Error Handling ${namespace}::"${message}"`,
    data: { ok: false, error }
  }
})

export const MISSING_METHOD = (namespace, message, error={}) => ({
  result: "app::error",
  payload: {
    message: `Unknown message "${message}" for ${namespace}`,
    data: { ok: false, error }
  }
})
