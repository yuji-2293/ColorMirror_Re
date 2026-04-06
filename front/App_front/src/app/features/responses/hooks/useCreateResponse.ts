import { useMutation } from '@tanstack/react-query';
import createResponse from '@/app/features/responses/api/createResponse';
import {
  type CreateResponse,
  type CreateResponseDataParams,
} from '@/app/features/responses/types/Response';
export function useCreateResponse() {
  const mutation = useMutation<CreateResponse, Error, CreateResponseDataParams>({
    mutationFn: (params) => createResponse(params),
  });
  const createResponseData = mutation.data?.data || null;
  console.log(createResponseData);
  return {
    ...mutation,
    createResponse: mutation.mutate,
    createResponseData,
  };
}
