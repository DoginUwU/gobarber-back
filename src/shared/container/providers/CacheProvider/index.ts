import { container } from "tsyringe";
import RedisCacheProvider from "./implementations/RedisCacheProvider";
import ICacheProvider from "./models/ICacheProvider";

container.registerSingleton<ICacheProvider>(
    "CacheProvider",
    RedisCacheProvider
);
