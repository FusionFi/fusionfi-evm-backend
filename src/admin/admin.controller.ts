import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Collateral } from './entity/collateral.entity';
import { CollateralDto } from './dto/collateral.dto';
import { Supply } from './entity/supply.entity';
import { SupplyDto } from './dto/supply.dto';
import { Setting } from './entity/setting.entity';
import { SettingDto } from './dto/setting.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { mapCollateral } from './response-dto/collateral.map';
import { mapSupply } from './response-dto/supply.map';
import { mapSetting } from './response-dto/setting.map';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('admin')
@Roles(Role.Admin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Add a new collateral' })
  @Post('collateral')
  async createCollateral(@Body() collateralDto: CollateralDto) {
    try {
      const newCollateral =
        await this.adminService.createCollateral(collateralDto);
      return mapCollateral(newCollateral);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Find all collaterals' })
  @Get('collateral')
  async findAllCollateral() {
    try {
      const allCollaterals = await this.adminService.findAllCollateral();
      return mapCollateral(allCollaterals);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Find a specific collateral by id' })
  @Get('collateral/:id')
  async findCollateral(@Param('id') id: string) {
    try {
      const collateral = await this.adminService.findCollateral(id);
      return mapCollateral(collateral);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Update a collateral' })
  @Patch('collateral/:id')
  async updateCollateral(
    @Param('id') id: string,
    @Body() collateralDto: CollateralDto,
  ) {
    try {
      const collateral = await this.adminService.updateCollateral(
        id,
        collateralDto,
      );
      return mapCollateral(collateral);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Delete a collateral' })
  @Delete('collateral/:id')
  removeCollateral(@Param('id') id: string) {
    try {
      return this.adminService.removeCollateral(id);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Add a new supply token' })
  @Post('supply')
  async createSupply(@Body() supplyDto: SupplyDto) {
    try {
      const newSupply = await this.adminService.createSupply(supplyDto);
      return mapSupply(newSupply);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Find all supply tokens' })
  @Get('supply')
  async findAllSupply() {
    try {
      const allSupply = await this.adminService.findAllSupply();
      return mapSupply(allSupply);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Find a specific supply token by id' })
  @Get('supply/:id')
  async findSupply(@Param('id') id: string) {
    try {
      const supply = await this.adminService.findSupply(id);
      return mapSupply(supply);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Update a supply token' })
  @Patch('supply/:id')
  async updateSupply(@Param('id') id: string, @Body() supplyDto: SupplyDto) {
    try {
      const supply = await this.adminService.updateSupply(id, supplyDto);
      return mapSupply(supply);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Delete a supply token' })
  @Delete('supply/:id')
  removeSupply(@Param('id') id: string) {
    try {
      return this.adminService.removeSupply(id);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Add a new setting' })
  @Post('setting')
  async createSetting(@Body() settingDto: SettingDto) {
    try {
      const newSetting = await this.adminService.createSetting(settingDto);
      return mapSetting(newSetting);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Find all settings' })
  @Get('setting')
  async findAllSetting() {
    try {
      const allSetting = await this.adminService.findAllSetting();
      return mapSetting(allSetting);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Find a specific setting by id' })
  @Get('setting/:id')
  async findSetting(@Param('id') id: string) {
    try {
      const setting = await this.adminService.findSetting(id);
      return mapSetting(setting);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Update a setting' })
  @Patch('setting/:id')
  async updateSetting(@Param('id') id: string, @Body() settingDto: SettingDto) {
    try {
      const setting = await this.adminService.updateSetting(id, settingDto);
      return mapSetting(setting);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }

  @ApiOperation({ summary: 'Delete a setting' })
  @Delete('setting/:id')
  removeSetting(@Param('id') id: string) {
    try {
      return this.adminService.removeSetting(id);
    } catch (e) {
      throw new HttpException(e.response, e.status);
    }
  }
}
