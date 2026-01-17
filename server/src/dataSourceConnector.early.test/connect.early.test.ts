import { DataSource } from "typeorm";
import { connect } from '../dataSourceConnector';
import { it, describe, expect } from '@jest/globals';

describe('connect() connect method', () => {
  // Happy Paths
  describe('Happy paths', () => {
    it('should initialize the DataSource if not initialized', async () => {
      // This test ensures that initialize is called when isInitialized is false.
      const mockDataSource = {
        isInitialized: false,
        initialize: jest.fn().mockResolvedValue({} as any as DataSource),
      } as unknown as jest.Mocked<DataSource>;

      await connect(mockDataSource);

      expect(jest.mocked(mockDataSource.initialize)).toHaveBeenCalledTimes(1);
    });

    it('should not initialize the DataSource if already initialized', async () => {
      // This test ensures that initialize is NOT called when isInitialized is true.
      const mockDataSource = {
        isInitialized: true,
        initialize: jest.fn(),
      } as unknown as jest.Mocked<DataSource>;

      await connect(mockDataSource);

      expect(jest.mocked(mockDataSource.initialize)).not.toHaveBeenCalled();
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    it('should propagate errors thrown by initialize', async () => {
      // This test ensures that if initialize throws, the error is propagated.
      const error = new Error('Initialization failed');
      const mockDataSource = {
        isInitialized: false,
        initialize: jest.fn().mockRejectedValue(error as never),
      } as unknown as jest.Mocked<DataSource>;

      await expect(connect(mockDataSource)).rejects.toThrow('Initialization failed');
      expect(jest.mocked(mockDataSource.initialize)).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple calls when isInitialized is false each time', async () => {
      // This test ensures that if connect is called multiple times with isInitialized false, initialize is called each time.
      const mockDataSource = {
        isInitialized: false,
        initialize: jest.fn().mockResolvedValue({} as any as DataSource),
      } as unknown as jest.Mocked<DataSource>;

      await connect(mockDataSource);
      await connect(mockDataSource);

      expect(jest.mocked(mockDataSource.initialize)).toHaveBeenCalledTimes(2);
    });

    it('should not call initialize if isInitialized is toggled to true between calls', async () => {
      // This test ensures that if isInitialized becomes true, initialize is not called again.
      const mockDataSource = {
        isInitialized: false,
        initialize: jest.fn().mockImplementation(function (this: any) {
          this.isInitialized = true;
          return Promise.resolve(this as DataSource);
        }),
      } as unknown as jest.Mocked<DataSource>;

      await connect(mockDataSource); // Should call initialize and set isInitialized to true
      await connect(mockDataSource); // Should NOT call initialize again

      expect(jest.mocked(mockDataSource.initialize)).toHaveBeenCalledTimes(1);
    });
  });
});