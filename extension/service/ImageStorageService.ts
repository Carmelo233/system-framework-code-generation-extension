import OSS from 'ali-oss';4
import { v4 as uuidv4 } from 'uuid';

export class ImageStorageService {
    private static client: OSS;
  
    // 使用静态块来自动初始化 OSS 客户端
    static {
        const region = 'oss-cn-guangzhou'; // 替换为你的区域
        const accessKeyId = 'LTAI5tGdomJMf4qRVuR67XEk'; // 替换为你的 Access Key ID
        const accessKeySecret = 'A0eeteRVYHAEEGncnpoLwWF2deBvyg'; // 替换为你的 Access Key Secret
        const bucket = 'uml-model'; // 替换为你的 Bucket 名称

        this.client = new OSS({
            region,
            accessKeyId,
            accessKeySecret,
            bucket,
        });
    }
  
    // 静态上传图片方法
    public static async uploadImage(base64String: string): Promise<string> {
      if (!this.client) {
        throw new Error("OSS client is not initialized. Call initialize() method first.");
      }
  
      try {
        // 解码Base64字符串并生成Buffer
        const buffer = Buffer.from(base64String, 'base64');
  
        // 生成UUID并设置文件名，文件后缀为png
        const fileName = `${uuidv4()}.png`;
  
        // 上传到OSS
        const result = await this.client.put(fileName, buffer);
        console.log('Upload Success:', result);
  
        // 返回文件的URL
        console.log('result.url:', result.url);
        return result.url; // 返回可访问的URL
      } catch (error) {
        console.error('Upload Error:', error);
        throw error; // 抛出错误以便调用者处理
      }
    }
  }