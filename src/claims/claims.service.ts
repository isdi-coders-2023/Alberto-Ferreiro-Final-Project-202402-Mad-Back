import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class ClaimsService {
  constructor(private prisma: PrismaService) {}

  async createClaim(
    policyId: string,
    createClaimDto: CreateClaimDto,
    file: Express.Multer.File,
  ) {
    const uploadResponse = await this.uploadImage(file);
    return this.prisma.claim.create({
      data: {
        ...createClaimDto,
        policyId,
        imageUrl: uploadResponse.secure_url,
        status: createClaimDto.status || 'open',
      },
    });
  }

  async findByPolicyId(policyId: string) {
    const claims = await this.prisma.claim.findMany({
      where: { policyId },
    });
    if (!claims.length) {
      throw new NotFoundException(`No claims found for policy ${policyId}`);
    }
    return claims;
  }

  protected async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'claims' }, (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload result is undefined'));
          resolve(result);
        })
        .end(file.buffer);
    });
  }
}
