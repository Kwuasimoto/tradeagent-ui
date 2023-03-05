import { Injectable } from "@angular/core";
import { fromByteArray } from 'base64-js'
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@tradeagent-ui/config";
import { LoggerService } from './logger.service';

export interface ImageResource {
  imageName: string,
  imageData: string,
}

@Injectable({
  providedIn: "root"
})
export class ImageService {
  readonly #logger = new LoggerService(ImageService)

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly http: HttpClient,
    private readonly config: ConfigService
  ) {}

  getImage(imageName: string) {
    return this.http.get(this.config.dbUrl+`/resources/img/${imageName}`, {
      responseType: "arraybuffer",
    })
  }

  getImages(imageNames: string[]) {
    return this.http.post<Array<ImageResource>>(this.config.dbUrl+`/resources/images`,
      { imageNames },
      {
        responseType: "json"
      })
  }

  imageByteArrayToBase64(buffer: ArrayBuffer):string {
    return fromByteArray(new Uint8Array(buffer))
  }

  imageFromBase64(base64: string): SafeUrl {
      const imgUrl = `data:image/png;base64,${base64}`
      return this.sanitizer.bypassSecurityTrustUrl(imgUrl)
  }
}
