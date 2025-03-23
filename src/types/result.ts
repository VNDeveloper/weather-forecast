
type Success<T> = { success: true; data: T; error?: never };
type Failure<E> = { success: false; data?: never; error: E };
export type Result<T, E = Error> = Success<T> | Failure<E>;