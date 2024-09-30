module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './', // ชี้ไปที่ root ของโปรเจกต์
  modulePaths: ['<rootDir>/src'], // ตั้งค่า modulePaths สำหรับ alias src/
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
