from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models.signals import post_delete
from django.dispatch import receiver
from geopy.distance import geodesic


    
class LandfillManager(models.Model):
    user = models.ForeignKey('ecosync.CustomUser', on_delete=models.CASCADE)    
    
    def __str__(self) -> str:
        return self.user.username
    def save(self, *args, **kwargs):
            if not self.pk:  # Check if it's a new instance
                # Check if the user is already an STS manager
                sts_manager_exists = STSManager.objects.filter(user=self.user).exists()
                if sts_manager_exists:
                    raise ValueError("User is already an STS manager and cannot be a Landfill manager. Delete it first to override.")

                # Update the user's role only if it's a new instance
                if self.user.role_id == 4:  # Check if the user's role is the default value (4)
                    self.user.role_id = 3  # Update the user's role to the desired value (3)
                    self.user.save()  # Save the user object with the updated role

            return super().save(*args, **kwargs)
        
    def delete(self, *args, **kwargs):
        if self.user.role_id == 3:  # Check if the user's role is the Landfill manager role
            self.user.role_id = 4  # Revert user's role to the default value (4)
            self.user.save()  # Save the user object with the updated role

        # Ensure to return the result of super().delete() after updating the user's role
        return super().delete(*args, **kwargs)
    
    

class STSManager(models.Model):
    user = models.ForeignKey('ecosync.CustomUser', on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.user.username
    def save(self, *args, **kwargs):
        if not self.pk:  # Check if it's a new instance
            # Check if the user is already a Landfill manager
            landfill_manager = LandfillManager.objects.filter(user=self.user).exists()
            if landfill_manager:
                raise ValueError("User is already a Landfill manager and cannot be an STS manager.")
            if self.user.role_id == 4:  # Check if the user's role is the default value (4)
                self.user.role_id = 2  # Update the user's role to the desired value (2)
                self.user.save()  # Save the user object with the updated role
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.user.role_id == 2:  # Check if the user's role is the STS manager role
            self.user.role_id = 4  # Revert user's role to the default value (4)
            self.user.save()  # Save the user object with the updated role
        super().delete(*args, **kwargs)



class SecondaryTransferStation(models.Model):

    STSID = models.AutoField(primary_key=True)
    WardNumber = models.CharField(max_length=20)
    Location = models.CharField(max_length=255)
    Manager = models.ForeignKey(STSManager, on_delete=models.CASCADE, blank=True, null=True)
    Capacity = models.DecimalField(max_digits=10, decimal_places=2)
    Latitude = models.FloatField(default=0.0)  # Default latitude of the GPS coordinates
    Longitude = models.FloatField(default=0.0) 
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.WardNumber
    
class Landfill(models.Model):
    LandfillID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=100)
    Location = models.CharField(max_length=255)
    Manager = models.ForeignKey(LandfillManager, on_delete=models.CASCADE, blank=True, null=True)
    Capacity = models.DecimalField(max_digits=10, decimal_places=2)  # Default capacity of the landfill
    OperationalTimespan = models.CharField(max_length=100, default='24/7')  # Operational timespan of the landfill
    Latitude = models.FloatField(default=0.0)  # Default latitude of the GPS coordinates
    Longitude = models.FloatField(default=0.0)  # Default longitude of the GPS coordinates
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.Name
    
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
        (15, '15 ton'),  # Adding 15 ton capacity choice
    ]
    
    VehicleID = models.AutoField(primary_key=True)
    RegistrationNumber = models.CharField(max_length=100)
    Type = models.CharField(max_length=255, choices=VEHICLE_TYPES)
    Capacity = models.IntegerField(choices=CAPACITY_CHOICES)  # Changed to IntegerField
    FuelCostLoaded = models.DecimalField(max_digits=10, decimal_places=2)
    FuelCostUnloaded = models.DecimalField(max_digits=10, decimal_places=2)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return self.RegistrationNumber

class WasteTransfer(models.Model):
    TransferID = models.AutoField(primary_key=True)
    Vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    Source = models.ForeignKey('SecondaryTransferStation', related_name='source_transfer', on_delete=models.CASCADE)
    Destination = models.ForeignKey('Landfill', related_name='destination_transfer', on_delete=models.CASCADE)
    Distance = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Distance attribute added
    VolumeOfWaste = models.DecimalField(max_digits=10, decimal_places=2)
    TimeOfArrival = models.DateTimeField()
    TimeOfDeparture = models.DateTimeField()
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.TransferID:
            # If it's a new transfer, calculate the distance before saving
            self.Distance = self.calculate_distance()
        super().save(*args, **kwargs)

    def calculate_distance(self):
        source_coords = (self.Source.GPSLatitude, self.Source.GPSLongitude)
        destination_coords = (self.Destination.Latitude, self.Destination.Longitude)
        return geodesic(source_coords, destination_coords).kilometers

    
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



