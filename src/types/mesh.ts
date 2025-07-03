import {TelegramUserData} from "@/types/telegram";
import {UserData} from "@/types/user";
import {TextureData} from "@/types/texture";

export interface MeshData {
    id: string;
    prompt: string;
    modelType: string;
    aiVersion: string;
    taskIdPreview: string;
    taskIdRefine?: string;

    modelGlbPreview?: string;
    modelFbxPreview?: string;
    modelUsdzPreview?: string;
    modelObjPreview?: string;
    previewImage?: string;
    videoPreview?: string;

    modelGlbRefine?: string;
    modelFbxRefine?: string;
    modelUsdzRefine?: string;
    modelObjRefine?: string;
    modelMtlRefine?: string;
    refineImage?: string;
    videoRefine?: string;

    textures?: TextureData[];
    userId?: string;
    telegramUserId?: string;
    user?: UserData;
    telegram?: TelegramUserData;

    state: string;
    createdAt: string;
    updatedAt: string;
}