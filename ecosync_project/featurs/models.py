from django.db import models
class Vehicle(models.Model):
    VEHICLE_TYPES = [
        ('Open Truck', 'Open Truck'),
        ('Dump Truck', 'Dump Truck'),
        ('Compactor', 'Compactor'),
        ('Container Carrier', 'Container Carrier'),
    ]
    
    CAPACITY_CHOICES = [
        (3, '3 ton'),
        (5, '5 ton'),
        (7, '7 ton'),
    ]
    
    VehicleID = models.AutoField(primary_key=True)
    RegistrationNumber = models.CharField(max_length=100)
    Type = models.CharField(max_length=255, choices=VEHICLE_TYPES)
    Capacity = models.DecimalField(max_digits=5, decimal_places=2, choices=CAPACITY_CHOICES)
    FuelCostLoaded = models.DecimalField(max_digits=10, decimal_places=2)
    FuelCostUnloaded = models.DecimalField(max_digits=10, decimal_places=2)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.RegistrationNumber
    
class SecondaryTransferStation(models.Model):
    STSID = models.AutoField(primary_key=True)
    WardNumber = models.CharField(max_length=20)
    Capacity = models.DecimalField(max_digits=10, decimal_places=2)
    GPSLatitude = models.FloatField()
    GPSLongitude = models.FloatField()
    Manager = models.ForeignKey('ecosync.CustomUser', on_delete=models.CASCADE)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.WardNumber
class Landfill(models.Model):
    LandfillID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=100)
    Location = models.CharField(max_length=255)
    Manager = models.ForeignKey('ecosync.CustomUser', on_delete=models.CASCADE)
    Capacity = models.DecimalField(max_digits=10, decimal_places=2, default=100)  # Default capacity of the landfill
    OperationalTimespan = models.CharField(max_length=100, default='24/7')  # Operational timespan of the landfill
    Latitude = models.FloatField(default=0.0)  # Default latitude of the GPS coordinates
    Longitude = models.FloatField(default=0.0)  # Default longitude of the GPS coordinates
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.Name
    
class WasteTransfer(models.Model):
    TransferID = models.AutoField(primary_key=True)
    Vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    Source = models.ForeignKey('SecondaryTransferStation', related_name='source_transfer', on_delete=models.CASCADE)
    Destination = models.ForeignKey('Landfill', related_name='destination_transfer', on_delete=models.CASCADE)
    VolumeOfWaste = models.DecimalField(max_digits=10, decimal_places=2)
    TimeOfArrival = models.DateTimeField()
    TimeOfDeparture = models.DateTimeField()
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    
class OilAllocation(models.Model):
    AllocationID = models.AutoField(primary_key=True)
    Vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    WeekNumber = models.IntegerField()
    VolumeOfWaste = models.DecimalField(max_digits=10, decimal_places=2)
    OilAllocated = models.DecimalField(max_digits=10, decimal_places=2)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return str(self.OilAllocated)
class Billing(models.Model):
    BillID = models.AutoField(primary_key=True)
    Vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    WeekNumber = models.IntegerField()
    VolumeOfWaste = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='VolumeOfWaste')
    Distance = models.DecimalField(max_digits=10, decimal_places=2)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    
class DumpingEntryRecord(models.Model):
    EntryID = models.AutoField(primary_key=True)
    Vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    Landfill = models.ForeignKey('Landfill', on_delete=models.CASCADE)
    VolumeOfWaste = models.DecimalField(max_digits=10, decimal_places=2)
    TimeOfArrival = models.DateTimeField()
    TimeOfDeparture = models.DateTimeField()
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

class Permission(models.Model):
    PermissionID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=100)
    Description = models.TextField()
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

class RolePermission(models.Model):
    RolePermissionID = models.AutoField(primary_key=True)
    Role = models.ForeignKey('Role', on_delete=models.CASCADE)
    Permission = models.ForeignKey('Permission', on_delete=models.CASCADE)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    
class Role(models.Model):
    RoleID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=100)
    Description = models.TextField()
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.Name
    
class Route(models.Model):
    RouteID = models.AutoField(primary_key=True)
    Source = models.ForeignKey('SecondaryTransferStation', related_name='source_route', on_delete=models.CASCADE)
    Destination = models.ForeignKey('Landfill', related_name='destination_route', on_delete=models.CASCADE)
    Distance = models.DecimalField(max_digits=10, decimal_places=2)
    EstimatedTime = models.DurationField()
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)
