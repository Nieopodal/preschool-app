import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { pageRenderHandler } from '../utils/page-render.handler';
import { User } from '../user/entity/user.entity';

interface RequestWithUser extends Request {
  user?: User;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request: RequestWithUser = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.error(exception);
    if (status === 401) {
      return response.redirect('/auth/login');
    }

    if (status === 400) {
      return pageRenderHandler(response, request.user, 'error/error', {
        error:
          (exception as BadRequestException).message === 'Bad Request'
            ? 'Przekazano niepoprawne dane.'
            : (exception as BadRequestException).message,
      });
    }

    if (
      status === 500 &&
      (exception as InternalServerErrorException).message !==
        'Internal Server Error'
    )
      return pageRenderHandler(response, request.user, 'error/error', {
        error: (exception as InternalServerErrorException).message,
      });

    return pageRenderHandler(response, request.user, 'error/error', {
      error: 'Przepraszamy, spróbuj ponownie później.',
    });
  }
}
