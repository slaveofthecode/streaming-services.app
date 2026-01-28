import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API de Gestión de Suscripciones de Streaming funcionando correctamente!';
  }
}
