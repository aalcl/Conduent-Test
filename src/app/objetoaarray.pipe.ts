import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'obtoarr'
})

export class ObjetoAArrayPipe implements PipeTransform{
    transform(object:any = []): any{
        return Object.values(object);
    }
}