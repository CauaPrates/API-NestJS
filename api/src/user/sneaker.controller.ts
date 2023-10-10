import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateSneakerDTO } from "./dto/create-sneaker.dto";
import { UpdatePutSneakerDTO } from "./dto/update-put-sneaker.dto";
import { UpdatePatchSneakerDTO } from "./dto/update-patch-sneaker.dto";

@Controller('sneaker')
export class SneakerController {
    //criar um constructor de lista

    private sneakers = [];
   

    @Post()
    async create(@Body() newSneaker: CreateSneakerDTO) {
        //inserir o usuario na lista
        this.sneakers.push(newSneaker)
        return 'Deu boa champs';
    }

    @Get()
    async list() {
        //retornar lista da classe
        return this.sneakers;
    }


    @Get(':emailUser')
    async readOne(@Body() {sneaker}: UpdatePatchSneakerDTO, @Param('emailUser') emailRecebido: string) {
        //retornar apenas um item da classe 

        const newArray = this.sneakers.filter((tenis) => {

            return tenis.emailUser == emailRecebido || [sneaker];
        })

        return newArray;
        
    

    }

    @Put(':emailUser')
    async update(@Body() {sneaker, emailUser}: UpdatePutSneakerDTO, @Param('emailUser') id: string) {

    return this.sneakers = [sneaker, emailUser];

    }

    @Patch(':emailUser')
    async updatePartial(@Body() {sneaker}: UpdatePatchSneakerDTO, @Param('emailUser', ParseIntPipe) id: number) {
        return  this.sneakers = [sneaker]
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            id
        }
    }



}