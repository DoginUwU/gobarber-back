import { container } from "tsyringe";
import DiskStorageProvider from "./fakes/FakeStorageProvider";
import IStorageProvider from "./models/IStorageProvider";

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    DiskStorageProvider
);
