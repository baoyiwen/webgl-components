// jest.config.ts
import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // 使用 ts-jest 预设
  testEnvironment: 'jsdom', // 使用 jsdom 测试环境
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // 指定测试环境设置文件
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 配置路径别名
  },
};

export default config
