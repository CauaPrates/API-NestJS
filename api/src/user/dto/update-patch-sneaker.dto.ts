import { CreateSneakerDTO } from "./create-sneaker.dto";
import {PartialType} from '@nestjs/mapped-types';

export class UpdatePatchSneakerDTO extends PartialType(CreateSneakerDTO){


}