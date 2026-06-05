import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from '../auth/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('patient')
export class PatientController {
  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PATIENT)
  getProfile() {
    return {
      message: 'Patient profile accessed',
    };
  }
}
