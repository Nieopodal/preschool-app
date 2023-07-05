import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { pageRenderHandler } from '../utils/page-render.handler';
import { User } from '../user/entity/user.entity';
import { CustomInternalServerException } from '../exceptions/custom-internal-server.exception';
import { CustomBadRequestException } from '../exceptions/custom-bad-request.exception';
import { CustomNotFoundException } from '../exceptions/custom-not-found.exception';

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

    if (exception instanceof CustomInternalServerException) {
      return pageRenderHandler(response, request.user, 'error/error', {
        error: (exception as CustomInternalServerException).message,
      });
    }

    if (status === 401) {
      response.status(401);
      return response.redirect('/auth/login');
    }

    if (status === 400) {
      response.status(400);
      return pageRenderHandler(response, request.user, 'error/error', {
        error: !(exception instanceof CustomBadRequestException)
          ? 'Przekazano niepoprawne dane.'
          : (exception as CustomBadRequestException).message,
      });
    }

    if (status === 404) {
      response.status(404);
      return pageRenderHandler(response, request.user, 'error/error', {
        error: !(exception instanceof CustomNotFoundException)
          ? 'Szukana strona nie istnieje.'
          : (exception as CustomNotFoundException).message,
      });
    }

    if (status === 429) {
      response.status(429);
      return pageRenderHandler(response, request.user, 'error/error', {
        error:
          'Wygenerowano zbyt wiele zapytań. Odczekaj minutę i odśwież stronę.',
      });
    }

    response.status(500);
    return pageRenderHandler(response, request.user, 'error/error', {
      error: 'Przepraszamy, spróbuj ponownie później.',
    });
  }
}
