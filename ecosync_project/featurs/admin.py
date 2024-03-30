from django.contrib import admin
from .models import *
from ecosync.models import *

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    search_fields = ['RegistrationNumber']
    list_display = ['VehicleID', 'RegistrationNumber', 'Type', 'Capacity', 'FuelCostLoaded', 'FuelCostUnloaded', 'CreatedAt', 'UpdatedAt']

@admin.register(SecondaryTransferStation)
class SecondaryTransferStationAdmin(admin.ModelAdmin):
    autocomplete_fields = ['Manager']
    list_display = ['STSID', 'WardNumber', 'Capacity', 'GPSLatitude', 'GPSLongitude', 'Manager', 'CreatedAt', 'UpdatedAt']

    # def formfield_for_foreignkey(self, db_field, request, **kwargs):
    #     if db_field.name == 'Manager':
    #         # Filter queryset to show only managers who have the role of "STS manager"
    #         queryset = CustomUser.objects.filter(role__Name='STS manager')
    #         # print(queryset)  # Print the queryset for debugging purposes
    #         kwargs['queryset'] = queryset
    #     return super().formfield_for_foreignkey(db_field, request, **kwargs)

@admin.register(Landfill)
class LandfillAdmin(admin.ModelAdmin):
    list_display = ['LandfillID', 'Name', 'Location', 'Manager', 'CreatedAt', 'UpdatedAt']

@admin.register(WasteTransfer)
class WasteTransferAdmin(admin.ModelAdmin):
    list_display = ['TransferID', 'Vehicle', 'Source', 'Destination', 'VolumeOfWaste', 'TimeOfArrival', 'TimeOfDeparture', 'CreatedAt', 'UpdatedAt']

@admin.register(OilAllocation)
class OilAllocationAdmin(admin.ModelAdmin):
    list_display = ['AllocationID', 'Vehicle', 'WeekNumber', 'VolumeOfWaste', 'OilAllocated', 'CreatedAt', 'UpdatedAt']
    search_fields = ['Vehicle__registration_number']

@admin.register(Billing)
class BillingAdmin(admin.ModelAdmin):
    autocomplete_fields = ['Vehicle']
    list_display = ['BillID', 'Vehicle', 'calculated_cost', 'WeekNumber', 'VolumeOfWaste', 'Distance', 'CreatedAt', 'UpdatedAt']
    readonly_fields = ['calculated_cost']
    
    class Meta:
        ordering = ['BillID']
    
    def cost_per_kilometer(self, obj):
        # Assuming C_unloaded and C_loaded are defined somewhere
        # Calculate the fraction of load relative to the truck's capacity
        load_fraction = obj.VolumeOfWaste / obj.Vehicle.Capacity

        C_loaded = obj.Vehicle.FuelCostLoaded
        C_unloaded = obj.Vehicle.FuelCostUnloaded
        # Interpolate the fuel cost per kilometer based on load
        cost_per_kilometer = C_unloaded + load_fraction * (C_loaded - C_unloaded)

        return cost_per_kilometer
    
    def calculated_cost(self, obj):
        total_cost = self.cost_per_kilometer(obj) * obj.Distance
        return round(total_cost, 3)
    
    calculated_cost.short_description = "Oil Allocation (TK)"
    
@admin.register(DumpingEntryRecord)
class DumpingEntryRecordAdmin(admin.ModelAdmin):
    autocomplete_fields = ['Vehicle']
    list_display = ['EntryID', 'Vehicle', 'Landfill', 'VolumeOfWaste', 'TimeOfArrival', 'TimeOfDeparture', 'CreatedAt', 'UpdatedAt']

@admin.register(Permission)
class PermissionsAdmin(admin.ModelAdmin):
    list_display = ['PermissionID', 'Name', 'Description', 'CreatedAt', 'UpdatedAt']

@admin.register(RolePermission)
class RolePermissionAdmin(admin.ModelAdmin):
    list_display = ['RolePermissionID', 'Role', 'Permission', 'CreatedAt', 'UpdatedAt']

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ['RoleID', 'Name', 'Description', 'CreatedAt', 'UpdatedAt']

@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ['RouteID', 'Source', 'Destination', 'Distance', 'EstimatedTime', 'CreatedAt', 'UpdatedAt']
