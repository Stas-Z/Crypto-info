import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class TokenDto {
    @IsString()
    name: string

    @IsString()
    symbol: string

    @IsString()
    contractAddress: string
}

export class GetBalanceDto {
    @IsString()
    address: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TokenDto)
    @IsOptional()
    tokens?: TokenDto[]
}
