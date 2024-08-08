import { UpdateResult } from 'typeorm';
import { HttpResponseDto } from '../dto/general.dto';

export const convertToHttpResponseDto = (
  updateResult: UpdateResult,
): HttpResponseDto => {
  const response = new HttpResponseDto();
  response.status = updateResult.affected ? 200 : 400;
  response.message = updateResult.affected
    ? 'Update successful'
    : 'Update failed';
  response.data = updateResult.raw;

  return response;
};
