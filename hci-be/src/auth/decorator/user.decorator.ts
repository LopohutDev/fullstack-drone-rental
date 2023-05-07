import { SetMetadata } from '@nestjs/common';

export const User = () => SetMetadata('isUser', true);
